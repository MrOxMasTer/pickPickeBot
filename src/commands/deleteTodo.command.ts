import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class DeleteTodoCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("deletetodo", (ctx) => {
            ctx.scene.enter("deleteTodo");
        });
    }
}
