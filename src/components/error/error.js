import { message } from 'antd';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ErrorMessage = () => {
  const err = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);
  const [messageApi, contextHolder] = message.useMessage();
  const error = useCallback(() => {
    messageApi.open({
      type: 'error',
      content: `${err.statusText}`,
      style: {
        backgroundColor: 'red',
        width: '30%',
        margin: '80px auto',
        borderRadius: '10px',
      },
    });
  }, [err.statusText, messageApi]);

  useEffect(() => {
    if (status === 'rejected') {
      error();
    }
  }, [status, error]);

  return <>{contextHolder}</>;
};

export { ErrorMessage };
