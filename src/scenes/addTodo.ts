import { nanoid } from "nanoid";
import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { IBotContext } from "../context/context.interface";

const addTodoScene = new Scenes.BaseScene<IBotContext>("addTodo");

addTodoScene.enter((ctx) =>
    ctx.reply("напиши задачу: ", Markup.keyboard(["Отменить ❌"]))
);

addTodoScene.hears("Отменить ❌", (ctx) => {
    return ctx.scene.enter("start");
});

addTodoScene.hears("Добавить ✅", (ctx) => {
    const todo = ctx.scene.state.currentTodo;

    if (todo) {
        ctx.session.todoList = [
            ...(ctx.session.todoList || []),
            {
                id: nanoid(),
                value: todo,
                isDone: false,
            },
        ];
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
        Markup.keyboard([["Добавить ✅", "Отменить ❌"], ["Изменить 🔩"]])
    );
});

export { addTodoScene };
