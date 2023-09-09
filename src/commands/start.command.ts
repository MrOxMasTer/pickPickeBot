import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply(
        "Привет",
        Markup.keyboard([
          Markup.button.callback("Привет", "hello"),
          Markup.button.callback("Пока", "goodbye"),
        ]).resize()
      );
    });

    this.bot.action("hello", (ctx) => {
      ctx.session.courseLike = true;
    });

    this.bot.action("goodbye", (ctx) => {
      ctx.session.courseLike = false;
    });
  }
}
