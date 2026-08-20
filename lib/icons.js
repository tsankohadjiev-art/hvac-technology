import {
  SnowflakeIcon,
  FanIcon,
  FlameIcon,
  ThermometerIcon,
  WrenchIcon,
  RulerIcon,
  WavesIcon,
  DropletIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClipboardIcon,
  FilterIcon,
  BulbIcon,
  SunIcon,
} from "@/components/Icons";

export const ICONS_MAP = {
  SnowflakeIcon,
  FanIcon,
  FlameIcon,
  ThermometerIcon,
  WrenchIcon,
  RulerIcon,
  WavesIcon,
  DropletIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClipboardIcon,
  FilterIcon,
  BulbIcon,
  SunIcon,
};

export const ICON_OPTIONS = Object.keys(ICONS_MAP);

export function resolveIcon(name) {
  return ICONS_MAP[name] || SnowflakeIcon;
}
