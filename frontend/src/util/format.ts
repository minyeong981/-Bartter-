import {BIRTH_PATTERN} from '@/util/validation.ts';

export default {
  birth: (birth: string) => {
    if (birth.length !== 8) throw new Error('생년월일은 8자리여야 합니다.');
    if (!birth.match(BIRTH_PATTERN))
      throw new Error('생년월일은 YYYYMMDD 형식의 숫자여야 합니다.');
    return (
      birth.slice(0, 4) + '-' + birth.slice(4, 6) + '-' + birth.slice(6, 8)
    );
  },
};