import React, {useState, useEffect} from 'react';

const DetailPanel = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Some API call
    setTimeout(() => {
      setLoading(false);
    }, 200000);
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      Takes a long time and lots of data
    </div>
  );
};

export default DetailPanel;