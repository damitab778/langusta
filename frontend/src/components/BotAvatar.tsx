import type { Bot } from '../data/bots';

export default function BotAvatar({ bot, size = 40 }: { bot: Bot; size?: number }) {
  return <img src={bot.avatar} alt={bot.name} width={size} height={size} />;
}
