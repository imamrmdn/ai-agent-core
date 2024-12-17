export declare const keyboardMarkup: {
    cancel: {
        parse_mode: string;
        reply_markup: string;
    };
    start: ({
        text: string;
        url: string;
    }[] | {
        text: string;
        callback_data: string;
    }[])[];
    socials: ({
        text: string;
        url: string;
    }[] | {
        text: string;
        callback_data: string;
    }[])[];
    welcome: {
        parse_mode: string;
        caption: string;
        reply_markup: any;
    };
};
