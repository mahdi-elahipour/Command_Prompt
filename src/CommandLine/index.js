import { useEffect, useState, useRef } from 'react';
import { splitText } from '../spliteString';
import { fnBrowserDetect } from '../fnBrowserDetect';
import CmdIcon from './images/cmd.png';
import { getDate } from '../getDate';

const commandsHelp = [
    {
        "help": [
            { command: "help >> ", description: "Provides Help information for commands." },
            { command: "emoji name >> ", description: "Provides emoji icon example smile->😊 :: The number of emojis is limited only smile,laugh,heart_eyes,sad,pensive,dizzy,woozzy,sleepy,downcast" },
            { command: "switch /? >> ", description: "You can use this switch for emojis and get the information of each emoji example smile /?" },
            { command: "browser >> ", description: "Shows your browser name" },
            { command: "getdate >> ", description: "Shows current date" },
            { command: "cls >> ", description: "clear screen" },
            { command: "Ctrl+Enter >> ", description: "maximum size" },
            { command: "close >> ", description: "close browser tab" },

        ]
    }
];
const commandsEmojies = [
    {
        "emojies": [
            { "emoji": "smile", em: "😊", description: "The smiling emoji feels all warm and fuzzy inside. This emoji is used to express positive feelings, from happiness to gratitude to affection. Because of its rosy cheeks, some people use the emoji to convey mild embarrassment." }
            , { "emoji": "laugh", em: "😂", description: "A yellow face with a big grin, uplifted eyebrows, and smiling eyes, each shedding a tear from laughing so hard. Widely used to show something is funny or pleasing." }
            , { "emoji": "heart_eyes", em: "😍", description: "Colloquially referred to as Heart-Eyes and officially called Smiling Face with Heart-Shaped Eyes within the Unicode Standard, 😍 Smiling Face with Heart-Eyes enthusiastically conveys love and infatuation, as if to say “I love/am in love with” or “I'm crazy about/obsessed with” someone or something." }
            , { "emoji": "sad", em: "😥", description: "Depicted as a yellow face with sad, closed eyes, furrowed eyebrows, and a slight, flat mouth. May convey a variety of sad emotions, including feeling disappointed, hurt, or lonely. Less intense than other sad emojis like 😭 Loudly Crying Face and more introspective" }
            , { "emoji": "pensive", em: "😔", description: "A pensive, remorseful face. Saddened by life. Quietly considering where things all went wrong. Depicted as a yellow face with sad, closed eyes, furrowed eyebrows, and a slight, flat mouth. May convey a variety of sad emotions, including feeling disappointed, hurt, or lonely." }
            , { "emoji": "dizzy", em: "😵", description: "May convey a heightened or hyperbolic sense of such feelings as shock, surprise, disbelief, awe, and amazement, as if staggered to the point of disorientation" }
            , { "emoji": "woozzy", em: "🥴", description: "Don’t feel bad if you weren’t sure what the 🥴 emoji meant the first time you saw it—when it debuted in 2018, pretty much no one did. Because it’s so vague but particular all at once, it’s come to have a lot of different meanings in text messages and on social media platforms like Twitter, TikTok, Snapchat, Instagram, Facebook, and more. Even though there are a ton of different potential meanings for this awesome emoji, trust your gut—it's usually easy to decipher its meaning from the context. In this article, we’ll tell you all of the many meanings of the 🥴 emoji, plus show you how to use it yourself. Prepare to be befuddled no more! 🥴" }
            , { "emoji": "sleepy", em: "😪", description: "A yellow face with eyes closed and mouth letting out three, cartoon-styled Zzz's overhead to indicate it's sound asleep. The Zzz's appear blue or purple across most platforms. May also represent boredom (slang, snooze). Generally used instead of 😪 Sleepy Face to convey sleep or sleepiness" }
            , { "emoji": "downcast", em: "😓", description: "Meaning widely varies, but commonly conveys a moderate degree of sadness, pain, frustration, or disappointment, similar to 😢 Crying Face and 😥 Sad But Relieved Face" }
        ]
    }


];
const browser = fnBrowserDetect();
const CommandLine = () => {
    const [command, setCommand] = useState("");
    const [printresult, setPrintResult] = useState([]);

    const inputCommandRef = useRef(null);
    const [maximize, setMaximize] = useState(false);


    useEffect(() => {
        inputCommandRef.current.focus();

    }, [])
    const HandleEnterKey = (e) => {
        setCommand(e.target.innerText);

        if (e.key === "Enter") {
            if (e.ctrlKey && e.which == '13') {
                setMaximize(!maximize);
            } else {
                e.target.innerText = "";
                const findEmoji = commandsEmojies[0].emojies.find(element => {
                    return element["emoji"] === command;
                })
                const findSwitch = commandsEmojies[0].emojies.find(element => {
                    return element.emoji === splitText(command, 0) && splitText(command, 1) === "/?" && element["description"];

                }
                );
                findEmoji ? setPrintResult([...printresult, "~:\\ " + findEmoji.em]) : setPrintResult([...printresult, "~:\\ Command Not Found!"]);
                if (findSwitch) {
                    setPrintResult([...printresult, "~:\\ " + findSwitch.description])
                }

                switch (command) {
                    case 'cls': {
                        setPrintResult([""]);
                        e.target.innerText = "";
                        break;

                    }
                    case 'help': {
                        <table border="1">{setPrintResult([commandsHelp[0].help.map((commands, index) => <tr key={index}><td width={'100px'}>{commands.command}</td><td>{commands.description}</td></tr>)])}</table>
                        break;
                    }
                    case 'browser': {
                        setPrintResult([...printresult, browser]);
                        break;

                    }
                    case 'getdate': {
                        setPrintResult([...printresult, getDate()]);
                        break;

                    }
                    case 'close': {
                        window.close();
                        break;

                    }
                    default: {

                    }
                }
            }
        }
    }
    return (
        <div className='command-prompt'>
            <div className={`command-prompt-header ${maximize && 'cp-header-max-width'}`}><img src={CmdIcon} alt='cmd' />command prompt</div>
            <div className={`command-line ${maximize && 'maximize'}`} onClick={() => inputCommandRef.current.focus()}>
                <ul style={{ listStyle: 'none' }} className={printresult.map(pr => pr.length > 2 && "cc")}>{printresult.map((result, index) => <li key={index}>{result}</li>)}<br /></ul>
                <div style={{ display: "flex" }}>

                    <div style={{ width: "20px" }}>~:\</div>
                    <div suppressContentEditableWarning={true} contentEditable={true} ref={inputCommandRef} style={{ color: "white", width: 'fit-content', caretColor: 'transparent', cursor: "pointer", outline: 'none' }} onKeyUp={(e) => HandleEnterKey(e)} className='cli'></div><span>&nbsp;</span>
                </div>
            </div>
        </div>

    )
}

export default CommandLine;