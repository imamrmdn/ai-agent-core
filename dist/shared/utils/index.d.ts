export declare enum CallbackInfo {
    GUID = 1,
    SOCIALS = 2,
    REMOVE_BG = 3,
    CARTOON = 4,
    COLORIZE = 5,
    MEME = 6,
    DESC = 7,
    BACK = 8,
    CANCEL = 9,
    CREDITS = 10,
    SOON_FITUR = 11,
    TTG = 12
}
export declare function commingSoon(fitur: string): string;
export declare function detectNumber(text: string): RegExpMatchArray;
export declare function detectTextMeme(text: string): RegExpMatchArray;
export declare function generateNumber0to7(): number;
export declare const textInfo: {
    welcome: string;
    comming_soon: string;
    description: string;
    guidline: string;
    errorCartoonType: string;
    limitText: string;
    commandCartoon: string;
    catchErrorText: string;
    catchBalanceText: string;
    soon_feature: string;
    commandColorize: string;
    errorCondition: string;
    commandMeme: string;
    welcomeLaunch: string;
    instructions: string;
};
