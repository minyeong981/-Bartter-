import {createFileRoute} from '@tanstack/react-router';

import GeneralButton from '../../components/Buttons/GeneralButton.tsx';

export const Route = createFileRoute('/_layout/')({
  component: () => (
    <div>
      <GeneralButton
        buttonStyle={{style: 'flexible', type: 'outlined'}}
        disabled
      >
        Button
      </GeneralButton>
    </div>
  ),
});