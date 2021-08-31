import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useEditState } from 'tinacms/dist/edit-state';

const GoToEditPage = () => {
  const { setEdit } = useEditState();
  const router = useRouter();
  useEffect(() => {
    setEdit(false);
    router.back();
  }, [router, setEdit]);
  return <div>Exiting edit mode..</div>;
};

export default GoToEditPage;
