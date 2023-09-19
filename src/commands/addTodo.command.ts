import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class AddTodoCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("addTodo", (ctx) => {
            ctx.scene.enter("addTodo");
        });
    }
}
