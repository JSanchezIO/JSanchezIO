import { SlashCommandBuilder } from 'discord.js';

export const sensitivityProfileChoices = [
  {
    name: 'Apex Legends',
    value: 'apexLegends',
  },
  {
    name: 'cm/rev',
    value: 'cmPerRev',
  },
  {
    name: 'CoD: Modern Warfare',
    value: 'codModernWarfare',
  },
  {
    name: 'CS:GO',
    value: 'csgo',
  },
  {
    name: 'deg/mm',
    value: 'degPerMm',
  },
  {
    name: 'Fortnite',
    value: 'fortniteConfig',
  },
  {
    name: 'Fortnite Slider',
    value: 'fortniteSlider',
  },
  {
    name: 'in/rev',
    value: 'inPerRev',
  },
  {
    name: 'Overwatch',
    value: 'overwatch',
  },
  {
    name: 'Quake',
    value: 'quake',
  },
  {
    name: 'Reflex',
    value: 'reflex',
  },
  {
    name: 'Siege',
    value: 'siege',
  },
  {
    name: 'CS:S',
    value: 'source',
  },
  {
    name: 'Valorant',
    value: 'valorant',
  },
];

/**
 * The /convert-sensitivity command.
 */
export const convertSensitivitySlashCommand = new SlashCommandBuilder()
  .setName('convert-sensitivity')
  .setDescription(
    "Convert sensitivities across multiple games. Based on the magic from KovaaK's Sensitivity Matcher."
  )
  .addNumberOption((option) =>
    option
      .setDescription(
        'The sensitivity value according to the specified `inputSensitivityProfileName`.'
      )
      .setMinValue(0)
      .setName('input-sensitivity')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setChoices(...sensitivityProfileChoices)
      .setDescription(
        'The sensitivity profile name from which the input sensitivity was taken from.'
      )
      .setName('input-sensitivity-profile-name')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setChoices(...sensitivityProfileChoices)
      .setDescription('The sensitivity profile name to convert the `inputSensitivity` to.')
      .setName('output-sensitivity-profile-name')
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setDescription("The target mouse's DPI. Defaults to 800.")
      .setName('counts-per-inch')
      .setMinValue(0)
  )
  .addIntegerOption((option) =>
    option
      .setDescription(
        'The number of decimal places, between 0 - 15, to round the output to. Defaults to 5.'
      )
      .setName('decimals')
      .setMinValue(0)
      .setMaxValue(15)
  )
  .toJSON();
