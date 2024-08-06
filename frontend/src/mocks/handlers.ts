import {http, HttpResponse} from 'msw';

export const handlers = [
  http.post('http://localhost:8080/login', () => {
    return new HttpResponse(null, {
      headers: {Authorization: 'Bearer ey', 'Set-Cookie': 'refresh=ey'},
    });
  }),
  http.post('http://localhost:8080/user/join', () => {
    return new HttpResponse(null);
  }),
  http.post('http://localhost:8080/user/logout', () => {
    return new HttpResponse(null);
  }),
  http.post<{}, Coordinate, SimpleLocation>(
    'http://localhost:8080/user/location',
    async () => {
      return HttpResponse.json({
        locationId: 1,
        locationName: '서울특별시 종로구 사직동',
      });
    },
  ),
  http.get('http://localhost:8080/trades/posts', async ({request}) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const limit = url.searchParams.get('limit');

    if (!page || !limit) return new HttpResponse(null, {status: 400});

    return HttpResponse.json();
  }),
  http.get<{tradePostId: string}, null, CropTradePost>(
    'http://localhost:8080/trades/posts/:tradePostId',
    ({params}) => {
      const {tradePostId} = params;
      if (!tradePostId || isNaN(Number(tradePostId)))
        return HttpResponse.json(null, {status: 400});

      return HttpResponse.json({
        tradePostId: 1,
        title: '판매합니다',
        content: '판매합니다',
        user: {
          userId: '1',
          nickname: 'nickname',
          profileImage:
            'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg',
        },
        cropId: 1,
        hasCrop: true,
        location: {locationId: 1, locationName: '서울특별시 종로구 사직동'},
        imageList: [
          'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg',
        ],
        createdAt: new Date().toLocaleDateString(),
        desiredCategoryList: [
          {
            name: '당근',
            cropCategoryId: 1,
            image:
              'https://media.istockphoto.com/id/166106089/ko/%EC%82%AC%EC%A7%84/%EC%86%90%EA%B8%88-%EA%B2%A9%EB%A6%AC%EB%90%A8%EC%97%90.jpg?s=612x612&w=0&k=20&c=Co67pHp2_Oaf0noqvGn4kaKje4UD0z8ifMHY9Ormnvw=',
          },
        ],
      });
    },
  ),
];