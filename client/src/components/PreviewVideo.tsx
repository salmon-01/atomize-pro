interface PreviewVideoProps {
  video: string;
}

export default function PreviewVideo({ video }: PreviewVideoProps) {
  return <video className="preview-vid" src={video} autoPlay loop data-testid="preview-video"/>;
}
