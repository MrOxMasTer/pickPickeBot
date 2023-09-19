import { Todo } from "@prisma/client";
import { Markup, Scenes } from "telegraf";
import { callbackQuery } from "telegraf/filters";
import { IBotContext } from "../context/context.interface";
import { prisma } from "../database/prisma.service";

const markTodoScene = new Scenes.BaseScene<IBotContext>("markTodo");

markTodoScene.enter(async (ctx) => {
    const todoList = await prisma.todo.findMany({
        where: {
            userId: ctx.from?.id,
        },
    });

    if (todoList.length === 0) {
        await ctx.sendMessage("В вашем списке ничего нет");
        return ctx.scene.enter("start");
    }

    const inlineButtonTodoList = todoList.map((_: Todo, index: number) =>
        Markup.button.callback(`${index + 1}`, `${index + 1}`)
    );

    return ctx.sendMessage("Какую?", {
        reply_markup: {
            inline_keyboard: [
                [...inlineButtonTodoList],
                [Markup.button.callback("Отменить", "Отменить")],
            ],
        },
    });
});

markTodoScene.action("Отменить", (ctx) => {
    return ctx.scene.enter("viewTodoList");
});

markTodoScene.on(callbackQuery("data"), async (ctx) => {
    const result = Number(ctx.callbackQuery.data) - 1;

    const todoList = await prisma.todo.findMany({
        where: {
            userId: ctx.from?.id,
        },
    });

    await prisma.todo.update({
        where: {
            id: todoList[result].id,
            userId: ctx.from?.id,
        },
        data: {
            isDone: true,
        },
    });

    return ctx.scene.enter("viewTodoList");
});

export { markTodoScene };
