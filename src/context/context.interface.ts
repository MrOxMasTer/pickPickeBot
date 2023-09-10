import { Context, Scenes } from "telegraf";

interface ExtWizardSession extends Scenes.WizardSessionData {
    email: string;
    nickname: string;
    password: string;
}

interface Todo {
    id: string;
    value: string;
    isDone: boolean;
}

interface SceneState {
    currentTodo: string;
}

export interface ExtSession extends Scenes.WizardSession<ExtWizardSession> {
    todoList: Todo[];
}

export interface IBotContext extends Context {
    session: ExtSession;
    scene: Scenes.SceneContextScene<IBotContext, ExtWizardSession> & {
        state: SceneState;
    };
    wizard: Scenes.WizardContextWizard<IBotContext>;
}
