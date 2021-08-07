import Dynamic from 'next/dynamic';

const AdminNetlify = Dynamic<{}>(
  () => import(/* webpackChunkName: "AdminNetlify" */ '../../components/AdminNetlify').then((m) => m.AdminNetlify),
  {
    ssr: false,
  },
);

export default function AdminPage() {
  return (
    <div>
      <AdminNetlify />
    </div>
  );
}
