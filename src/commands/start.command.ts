import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { prisma } from "../database/prisma.service";
import { Command } from "./command.class";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start(async (ctx) => {
            try {
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            id: ctx.from.id,
                        },
                    });

                    if (!user) {
                        throw new Error("Пользователь не найден!");
                    }
                } catch (e) {
                    await prisma.user.create({
                        data: { id: ctx.from.id },
                    });

                    await ctx.sendMessage("Пользователь создан!");
                }

                await ctx.sendMessage(
                    `Добро пожаловать в ваш список дел, ${ctx.from?.first_name}`
                );

                return ctx.scene.enter("start");
            } catch (e) {
                return ctx.sendMessage(`Какая-то ошибка! ${e}`);
            }
        });
    }
}
