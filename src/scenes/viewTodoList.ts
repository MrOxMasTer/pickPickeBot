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
        ctx.reply(`В Вашем списке ничего нет`);
        ctx.scene.enter("start");
    } else {
        ctx.reply(
            `${todoList.map(
                ({ value, isDone }: Todo, index: number) =>
                    `${index + 1}. ${value} ${isDone ? "✅" : " "}`
            )}`,
            Markup.keyboard([
                ["Отметить ✅", "Удалить ❌"],
                ["Выйти 🔙"],
            ]).resize()
        );
    }
});

viewTodoListScene.hears("Отметить ✅", (ctx) => {
    ctx.scene.enter("markTodo");
});

viewTodoListScene.hears("Удалить ❌", (ctx) => {
    ctx.scene.enter("deleteTodo");
});

viewTodoListScene.hears("Выйти 🔙", (ctx) => {
    ctx.scene.enter("start");
});

export { viewTodoListScene };
