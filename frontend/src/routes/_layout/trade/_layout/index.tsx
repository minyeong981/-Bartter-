import {createFileRoute} from '@tanstack/react-router';

import CropSelector from '@/components/CropSelector';
import TradeCard from '@/components/TradeCard';

export const Route = createFileRoute('/_layout/trade/_layout/')({
  component: TradeListPage,
});

function TradeListPage() {
  return (
    <>
      <CropSelector from="모두" to="모두" />
      <TradeCard
        imageURL="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b"
        isLike={true}
        createdAt="2021-09-01"
        likeCount={0}
        cropTradePostId={1}
        status="COMPLETED"
        location={{locationName: '광산구 수완동', locationId: 1}}
        title="파프리카 판매합니다."
        isShare={true}
      />
      <TradeCard
        imageURL="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b"
        isLike={true}
        createdAt="2021-09-01"
        likeCount={0}
        cropTradePostId={1}
        status="COMPLETED"
        location={{locationName: '광산구 수완동', locationId: 1}}
        title="파프리카 판매합니다."
        isShare={true}
      />
      <TradeCard
        imageURL="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b"
        isLike={true}
        createdAt="2021-09-01"
        likeCount={0}
        cropTradePostId={1}
        status="COMPLETED"
        location={{locationName: '광산구 수완동', locationId: 1}}
        title="파프리카 판매합니다."
        isShare={true}
      />
      <TradeCard
        imageURL="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b"
        isLike={true}
        createdAt="2021-09-01"
        likeCount={0}
        cropTradePostId={1}
        status="COMPLETED"
        location={{locationName: '광산구 수완동', locationId: 1}}
        title="파프리카 판매합니다."
        isShare={true}
      />
      <TradeCard
        imageURL="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b"
        isLike={true}
        createdAt="2021-09-01"
        likeCount={0}
        cropTradePostId={1}
        status="COMPLETED"
        location={{locationName: '광산구 수완동', locationId: 1}}
        title="파프리카 판매합니다."
        isShare={true}
      />
      <TradeCard
        imageURL="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b"
        isLike={true}
        createdAt="2021-09-01"
        likeCount={0}
        cropTradePostId={1}
        status="COMPLETED"
        location={{locationName: '광산구 수완동', locationId: 1}}
        title="파프리카 판매합니다."
        isShare={true}
      />
      <TradeCard
        imageURL="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b"
        isLike={true}
        createdAt="2021-09-01"
        likeCount={0}
        cropTradePostId={1}
        status="COMPLETED"
        location={{locationName: '광산구 수완동', locationId: 1}}
        title="파프리카 판매합니다."
        isShare={true}
      />
      <TradeCard
        imageURL="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b"
        isLike={true}
        createdAt="2021-09-01"
        likeCount={0}
        cropTradePostId={1}
        status="COMPLETED"
        location={{locationName: '광산구 수완동', locationId: 1}}
        title="파프리카 판매합니다."
        isShare={true}
      />
      <TradeCard
        imageURL="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b"
        isLike={true}
        createdAt="2021-09-01"
        likeCount={0}
        cropTradePostId={1}
        status="COMPLETED"
        location={{locationName: '광산구 수완동', locationId: 1}}
        title="파프리카 판매합니다."
        isShare={true}
      />
    </>
  );
}