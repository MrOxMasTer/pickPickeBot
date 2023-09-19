import { Todo } from "@prisma/client";
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

    if (todoList.length === 0) {
        await ctx.sendMessage("В вашем списке ничего нет");
        return ctx.scene.enter("start");
    }

    const inlineButtonTodoList = todoList.map((_: Todo, index: number) =>
        Markup.button.callback(`${index + 1}`, `${index + 1}`)
    );

    return ctx.sendMessage("Какую?", {
        reply_markup: {
            inline_keyboard: [[...inlineButtonTodoList]],
            keyboard: [[{ text: "Отменить ❌" }]],
        },
    });
});

deleteTodoScene.hears("Отменить ❌", (ctx) => {
    return ctx.scene.enter("viewTodoList");
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

    return ctx.scene.enter("viewTodoList");
});

export { deleteTodoScene };
