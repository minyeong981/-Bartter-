// import { createFileRoute } from '@tanstack/react-router';
// import classnames from 'classnames/bind';

// import LinkButton from '@/components/Buttons/LinkButton';
// import MyCrops from '@/components/Crop/myCrops';
// import Search from '@/components/Search/Search';

// import styles from './wrtie.module.scss';

// const cx = classnames.bind(styles);


// export const Route = createFileRoute('/_layout/diary/write/1')({
//   component: DiaryWritePage,
// });


// function DiaryWritePage() {
//   return (
//     <div className={cx('DiaryWritePage')}>
//       <h1>어떤 작물의 일지인가요?</h1>
//       <Search onSearch={(term) => console.log(term)} />
//       <MyCrops/>
//       <div className={cx('buttonContainer')}>
//       <LinkButton
//           buttonStyle={{style: 'primary', size: 'large'}}
//           to="/diary/write/2"
//           // disabled={!isValid}
//         >
//           다음
//       </LinkButton>
//       </div>
//     </div>
//   );
// }

// export default DiaryWritePage;