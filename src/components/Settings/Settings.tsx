import { useSettingsContext } from '@/contexts/settings.context';
import { Button, Modal, ModalClose, ModalDialog } from '@mui/joy';
import Input from '@mui/joy/Input';
import { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/dist/css/rcp.css';
import styles from './Settings.module.css';

const Settings = () => {
  const { backgroundColor, setBackgroundColor, chatLink, setChatLink } = useSettingsContext();

  const [isBackgroundColorPickerOpen, setIsBackgroundColorPickerOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [color, setColor] = useColor(backgroundColor);
  const [link, setLink] = useState<string>(chatLink);

  const handleLinkSave = () => {
    const isLinkValid = link.match(/^https:\/\/botrix\.live\/widgets\/chat\/?/);

    if (isLinkValid) {
      setChatLink(link);
    } else {
      setLink(chatLink);
    }

    setIsEditing(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles['chat-link']}>
        <Input
          className={styles['chat-link-input']}
          variant='soft'
          placeholder='Chat link'
          disabled={!isEditing}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {!isEditing ? (
          <Button className={styles['button']} variant='soft' color='primary' onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ) : (
          <Button className={styles['button']} variant='soft' color='success' onClick={handleLinkSave}>
            Save
          </Button>
        )}
      </div>
      <Modal open={isBackgroundColorPickerOpen} onClose={() => setIsBackgroundColorPickerOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <div className={styles['color-picker-ui']}>
            <ColorPicker color={color} onChange={setColor} onChangeComplete={() => setBackgroundColor(color.hex)} />
          </div>
        </ModalDialog>
      </Modal>
      <div
        className={styles['background-color-picker']}
        style={{ backgroundColor: backgroundColor }}
        onClick={() => setIsBackgroundColorPickerOpen(true)}
      ></div>
    </div>
  );
};
export default Settings;
