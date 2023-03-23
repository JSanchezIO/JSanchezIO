import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { ChalkConsoleLoggingService } from '../chalk-console-logging-service';
import type { SupportedSensitivityProfileName } from '../convert-sensitivities';
import { convertSensitivites } from '../convert-sensitivities';
import { Maybe } from '../maybe';
import type { Result } from '../result';
import {
  convertSensitivitySlashCommand,
  sensitivityProfileChoices,
} from './convert-sensitivity-slash-command';

let isRegistered = false;

/**
 * Registers the Bot's slash commands with Discord's API.
 */
const registerSlashCommands = async () => {
  if (isRegistered) {
    return;
  }

  const authToken = Maybe.from(process.env.DISCORD_AUTH_TOKEN).getValueOrThrow(
    'The Discord authorization token is required.'
  );

  const restClient = new REST({ version: '10' }).setToken(authToken);

  const applicationId = Maybe.from(process.env.DISCORD_APPLICATION_ID).getValueOrThrow(
    'The Discord application identifier is required.'
  );

  await restClient.put(Routes.applicationCommands(applicationId), {
    body: [convertSensitivitySlashCommand],
  });

  isRegistered = true;
};

const isNotGameSensitivityProfile = (profileName: string) => {
  return profileName === 'cm/rev' || profileName === 'deg/mm' || profileName === 'in/rev';
};

/**
 * Constructs the success or failure message of the conversion operation.
 */
const getContent = (
  conversionResult: Result<Domain.ProfileSensitivity>,
  countsPerInch: number,
  inputSensitivity: number,
  inputSensitivityProfileValue: string,
  outputSensitivityProfileValue: string
): string => {
  if (conversionResult.isFailure) {
    return `We were unable perform this conversion. ${conversionResult.errorMessage}`;
  }

  const inputSensitivityProfileName =
    sensitivityProfileChoices.find(
      (sensitivityProfileChoice) => sensitivityProfileChoice.value === inputSensitivityProfileValue
    )?.name ?? inputSensitivityProfileValue;

  const isInputNonGameSensitivityProfile = isNotGameSensitivityProfile(inputSensitivityProfileName);

  const outputSensitivityProfileName =
    sensitivityProfileChoices.find(
      (sensitivityProfileChoice) => sensitivityProfileChoice.value === outputSensitivityProfileValue
    )?.name ?? outputSensitivityProfileValue;

  const isOutputNonGameSensitivityProfile = isNotGameSensitivityProfile(
    outputSensitivityProfileName
  );

  const isConvertingNonGameSensitivityProfile =
    isInputNonGameSensitivityProfile || isOutputNonGameSensitivityProfile;

  let content = '';

  if (isConvertingNonGameSensitivityProfile) {
    content += `Using ${countsPerInch} CPI, `;
  }

  if (isInputNonGameSensitivityProfile) {
    content += `${inputSensitivity} ${inputSensitivityProfileName} `;
  } else {
    content += `${inputSensitivity} in ${inputSensitivityProfileName} `;
  }

  content += 'is approximately ';

  if (isOutputNonGameSensitivityProfile) {
    content += `${conversionResult.value} ${outputSensitivityProfileName} `;
  } else {
    content += `${conversionResult.value} in ${outputSensitivityProfileName} `;
  }

  return content;
};

/**
 * Starts the Discord Bot.
 */
export const start = async () => {
  const logger: Infrastructure.ILoggingService = new ChalkConsoleLoggingService();

  await registerSlashCommands();

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    if (interaction.commandName !== convertSensitivitySlashCommand.name) {
      return;
    }

    const inputSensitivity = interaction.options.getNumber('input-sensitivity', true);
    const inputSensitivityProfileName = interaction.options.getString(
      'input-sensitivity-profile-name',
      true
    ) as SupportedSensitivityProfileName;
    const outputSensitivityProfileName = interaction.options.getString(
      'output-sensitivity-profile-name',
      true
    ) as SupportedSensitivityProfileName;
    const countsPerInch = interaction.options.getInteger('counts-per-inch') ?? 800;
    const decimals = interaction.options.getInteger('decimals') ?? 5;

    const conversionResult = convertSensitivites(
      countsPerInch,
      decimals,
      inputSensitivity,
      inputSensitivityProfileName,
      outputSensitivityProfileName
    );

    const content = getContent(
      conversionResult,
      countsPerInch,
      inputSensitivity,
      inputSensitivityProfileName,
      outputSensitivityProfileName
    );

    await interaction.reply({
      content,
      ephemeral: true,
    });
  });

  client.on('ready', () => {
    logger.log(`[${new Date().toUTCString()}]: Logged in as ${client.user?.tag}`);
  });

  const authToken = Maybe.from(process.env.DISCORD_AUTH_TOKEN).getValueOrThrow(
    'The Discord authorization token is required.'
  );

  client.login(authToken);
};
