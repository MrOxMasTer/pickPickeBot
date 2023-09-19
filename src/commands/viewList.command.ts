import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class ViewListCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("viewList", (ctx) => {
            ctx.scene.enter("viewTodoList");
        });
    }
}
