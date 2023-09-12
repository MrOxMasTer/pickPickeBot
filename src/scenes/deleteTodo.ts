import { Markup, Scenes } from "telegraf";
import { callbackQuery } from "telegraf/filters";
import { IBotContext } from "../context/context.interface";
import { prisma } from "../database/prisma.service";

const deleteTodoScene = new Scenes.BaseScene<IBotContext>("deleteTodo");

deleteTodoScene.enter(async (ctx) => {
    const todoList = await prisma.todo.findMany({
        where: {
            userId: ctx.from?.id,
        },
    });

    const inlineButtonTodoList = todoList.map((item, index) =>
        Markup.button.callback(`${index + 1}`, `${index + 1}`)
    );

    ctx.reply("Какую?", Markup.inlineKeyboard(inlineButtonTodoList));
});

deleteTodoScene.on(callbackQuery("data"), async (ctx) => {
    const todoList = await prisma.todo.findMany({
        where: {
            userId: ctx.from?.id,
        },
    });

    const result = Number(ctx.callbackQuery.data) - 1;

    await prisma.todo.delete({
        where: {
            id: todoList[result].id,
            userId: ctx.from?.id,
        },
    });

    ctx.scene.enter("viewTodoList");
});

export { deleteTodoScene };
