import { nanoid } from "nanoid";
import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { IBotContext } from "../context/context.interface";
import { prisma } from "../database/prisma.service";

const addTodoScene = new Scenes.BaseScene<IBotContext>("addTodo");

addTodoScene.enter((ctx) =>
    ctx.sendMessage(
        "напишите задачу: ",
        Markup.keyboard(["Отменить ❌"]).resize()
    )
);

addTodoScene.hears("Отменить ❌", (ctx) => {
    return ctx.scene.enter("start");
});

addTodoScene.hears("Добавить ✅", async (ctx) => {
    const todo = ctx.scene.state.currentTodo;

    if (todo) {
        await prisma.todo.create({
            data: {
                id: nanoid(),
                value: todo,
                isDone: false,
                userId: ctx.from.id,
            },
        });
    } else {
        ctx.reply("Сообщение не должно быть пустым");
    }

    return ctx.scene.enter("start");
});

addTodoScene.hears("Изменить 🔩", (ctx) => {
    return ctx.scene.reenter();
});

addTodoScene.on(message("text"), (ctx) => {
    ctx.scene.state.currentTodo = ctx.message.text;

    return ctx.sendMessage(
        "Что бы вы хотели дальше сделать?",
        Markup.keyboard([
            ["Добавить ✅", "Отменить ❌"],
            ["Изменить 🔩"],
        ]).resize()
    );
});

export { addTodoScene };
