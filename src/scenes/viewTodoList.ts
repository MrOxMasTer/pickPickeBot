import { Todo } from "@prisma/client";
import { Markup, Scenes } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { prisma } from "../database/prisma.service";

const viewTodoListScene = new Scenes.BaseScene<IBotContext>("viewTodoList");

viewTodoListScene.enter(async (ctx) => {
    const todoList = await prisma.todo.findMany({
        where: {
            userId: ctx.from?.id,
        },
    });

    if (todoList.length === 0) {
        await ctx.sendMessage(`В Вашем списке ничего нет`);
        return ctx.scene.enter("start");
    } else {
        return ctx.sendMessage(
            `${todoList.reduce(
                (acc: string, { value, isDone }: Todo, index: number) =>
                    acc + `${index + 1}. ${value} ${isDone ? "✅" : ""}\n`,
                ""
            )}`,
            Markup.keyboard([
                ["Отметить ✅", "Удалить ❌"],
                ["Выйти 🔙"],
            ]).resize()
        );
    }
});

viewTodoListScene.hears("Отметить ✅", (ctx) => {
    return ctx.scene.enter("markTodo");
});

viewTodoListScene.hears("Удалить ❌", (ctx) => {
    return ctx.scene.enter("deleteTodo");
});

viewTodoListScene.hears("Выйти 🔙", (ctx) => {
    return ctx.scene.enter("start");
});

export { viewTodoListScene };
