import {createFileRoute} from '@tanstack/react-router';

import GeneralButton from '../../components/Buttons/GeneralButton';

export const Route = createFileRoute('/_layout/')({
  component: () => (
    <div>
      <GeneralButton buttonStyle={{style: 'primary', size: 'large'}}>
        버튼
      </GeneralButton>
    </div>
  ),
});