import dynamic from 'next/dynamic';

const RemoteButton = dynamic(() => import('chat/Button'), { ssr: false });

export default function Home() {
	return <div>
		<RemoteButton text="test" />
	</div>;
}

