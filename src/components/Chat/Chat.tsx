import { useSettingsContext } from '@/contexts/settings.context';
import styles from './Chat.module.css';

type ChatIframeProps = {
  link: string;
};

const MissingLinkMessage = () => (
  <div className={styles.linkMissingMessage}>
    <h1>BotRix Overlay Chat link is not set!</h1>
    <p>
      Set up your chat and copy the link on{' '}
      <a href='https://botrix.live/panel/widget/chat' target='_blank'>
        BotRix Chat Widget page.
      </a>
    </p>
  </div>
);

const ChatIframe = (props: ChatIframeProps) => (
  <iframe className={styles.iframe} id='botrix-chat' title='BotRix Multiplaform Chat' src={props.link} />
);

const Chat = () => {
  const { chatLink } = useSettingsContext();

  return <div className={styles.chat}>{!chatLink ? <MissingLinkMessage /> : <ChatIframe link={chatLink} />}</div>;
};
export default Chat;
