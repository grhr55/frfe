

export default function Tovar({ products ,  setReactions , sendDeviceReaction, fetchReactions , reactions}) {



     
  const handleLike = async (productId) => {
    const cur = reactions[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,  views: 0 };

    
    let likeDelta = 0, dizDelta = 0;
    const newLiked = !cur.liked;
    let newDisliked = cur.disliked;
    if (newLiked) {
      likeDelta = 1;
      if (cur.disliked) {
        dizDelta = -1;
        newDisliked = false;
      }
    } else {
      likeDelta = -1;
    }

    
    setReactions(prev => {
      const agg = prev[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,  views: 0 };
      return {
        ...prev,
        [productId]: {
          ...agg,
          likeCount: agg.likeCount + likeDelta,
          dizlace: agg.dizlace + dizDelta,
          liked: newLiked,
          disliked: newDisliked
        }
      };
    });

    
    const deviceLike = newLiked ? 1 : 0;
    const deviceDislike = newDisliked ? 1 : 0;
    await sendDeviceReaction({ productId, deviceLike, deviceDislike,  views: cur.views });

    
    await fetchReactions(productId);
  };

  
  const handleDislike = async (productId) => {
    const cur = reactions[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,  views: 0 };

    let dizDelta = 0, likeDelta = 0;
    const newDisliked = !cur.disliked;
    let newLiked = cur.liked;
    if (newDisliked) {
      dizDelta = 1;
      if (cur.liked) {
        likeDelta = -1;
        newLiked = false;
      }
    } else {
      dizDelta = -1;
    }

    setReactions(prev => {
      const agg = prev[productId] || { likeCount: 0, dizlace: 0, liked: false, disliked: false,  views: 0 };
      return {
        ...prev,
        [productId]: {
          ...agg,
          likeCount: agg.likeCount + likeDelta,
          dizlace: agg.dizlace + dizDelta,
          liked: newLiked,
          disliked: newDisliked
        }
      };
    });

    const deviceLike = newLiked ? 1 : 0;
    const deviceDislike = newDisliked ? 1 : 0;
    await sendDeviceReaction({ productId, deviceLike, deviceDislike,  views: cur.views });
    await fetchReactions(productId);
  };


}
