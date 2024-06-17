import { useState } from 'react'
import ModalVideo from 'react-modal-video'
import "../../node_modules/react-modal-video/css/modal-video.css"

export default function VideoPopup({ style }) {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            {style === 1 &&
                <a onClick={() => setOpen(true)} className="play-btn popup-video" data-aos="fade-left" data-aos-delay={700}><i className="fas fa-play" /> <span>Watch The Video</span></a>
            }
            {style === 2 &&
                <a onClick={() => setOpen(true)} className="play-btn popup-video"><i className="fas fa-play" />Watch Video</a>
            }
            {style === 3 &&
                <a onClick={() => setOpen(true)} className="play-btn popup-video"><i className="fas fa-play" /></a>
            }

            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="7e90gBu4pas" onClose={() => setOpen(false)} />
        </>
    )
}