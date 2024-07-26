import {createFileRoute} from '@tanstack/react-router';

import GeneralButton from '../../components/Buttons/GeneralButton';
import Header from '../../components/Header';

export const Route = createFileRoute('/_layout/')({
  component: () => (
    <div>
      <Header
        location="내위치"
        infoIcon="내정보"
        searchIcon="통합검색"
        alramIcon="알람"
      />
      <GeneralButton buttonStyle={{style: 'primary', size: 'medium'}}>
        텍스트
      </GeneralButton>
    </div>
  ),
});