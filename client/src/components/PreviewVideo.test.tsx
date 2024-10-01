import {render, screen} from "@testing-library/react"
import PreviewVideo from "./PreviewVideo"
import { describe, it, expect } from "vitest"
import sampleVideo from '../assets/vids/levels-animation.mp4'

describe("PreviewVideo component", () => {
  it("should render the video component", () => {
    render(<PreviewVideo video={sampleVideo}/>)
    const videoElement = screen.getByTestId("preview-video");
    expect(videoElement).toBeInTheDocument();
  })

  it("should have autoPlay and loop attributes", () => {
    render(<PreviewVideo video={sampleVideo} />);
    const videoElement = screen.getByTestId("preview-video");
    expect(videoElement).toHaveAttribute("autoPlay");
    expect(videoElement).toHaveAttribute("loop");
  });
})