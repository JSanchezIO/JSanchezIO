<div align="center">

<img alt='Sensitivity Converter Bot' src='https://cdn.discordapp.com/app-icons/536633635869163520/62a75f68fda7cf5bbf7611b7fe4d8f8b.png?size=256' style="border-radius: 50%;" />

# Sensitivity Converter Bot

A Discord bot designed to convert sensitivities across multiple games and units. Based on the magic
from KovaaK's Sensitivity Matcher.

</div>

## Installation

[Click Here to Install this Discord Bot](https://discordapp.com/api/oauth2/authorize?client_id=536633635869163520&scope=bot&permissions=2147485696)

## Usage

```sh
/convert-sensitivity input_sensitivity input_sensitivity_profile_name output_sensitivity_profile_name [counts_per_inch] [decimals]
```

### Arguments

| Name                              | Description                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `input_sensitivity`               | The sensitivity value according to the specified `inputSensitivityProfileName`.      |
| `input_sensitivity_profile_name`  | The sensitivity profile name from which the input sensitivity was taken from.        |
| `output_sensitivity_profile_name` | The sensitivity profile name to convert the `inputSensitivity` to.                   |
| `counts_per_inch`                 | The target mouse's DPI. Defaults to 800.                                             |
| `decimals`                        | The number of decimal places, between 0 - 15, to round the output to. Defaults to 5. |

### Sensitivity Profiles

- Apex Legends
- cm/rev
- CoD: Modern Warfare
- CS:GO
- deg/mm
- Fortnite
- Fortnite Slider
- in/rev
- Overwatch
- Quake
- Reflex
- Siege
- CS:S
- Valorant
