import { Message } from './ErrorMessage.styled';
import { FcAbout } from 'react-icons/fc';

export const ErrorMessage = () => {
  return (
    <Message>
      <FcAbout size={30} />
      OOPS. Something went wrong, reloading the page and try again
    </Message>
  );
};
