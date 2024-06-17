import { useRef } from "react"
import Slider from "react-slick"

const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
    ]
}

export default function Testimonial() {

    const sliderRef = useRef(null)

    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext()
        }
    }

    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev()
        }
    }
    return (
        <>
            <section className="testimonial-area-two testimonial-bg-two" data-background="/assets/img/bg/h2_testimonial_bg.jpg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="section-title-two white-title text-center mb-50 tg-heading-subheading animation-style3">
                                <span className="sub-title">Our Testimonials</span>
                                <h2 className="title tg-element-title">What Customers Say’s About Our Gerow Services</h2>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-item-wrap-two">
                        <Slider ref={sliderRef} {...settings} className="row testimonial-active-two">
                            <div className="col-lg-6">
                                <div className="testimonial-item-two">
                                    <div className="testimonial-content-two">
                                        <div className="rating">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <p>“ Morem ipsum dolor sit amet, consectetur adipiscing elita florai sum dolor sit amet, consecteture.Borem ipsum dolor sit amet, consectetur.</p>
                                        <div className="testimonial-avatar">
                                            <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div>
                                            <div className="avatar-info">
                                                <h2 className="title">Mr.Robey Alexa</h2>
                                                <span>CEO, Gerow Agency</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="testimonial-item-two">
                                    <div className="testimonial-content-two">
                                        <div className="rating">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <p>“ Morem ipsum dolor sit amet, consectetur adipiscing elita florai sum dolor sit amet, consecteture.Borem ipsum dolor sit amet, consectetur.</p>
                                        <div className="testimonial-avatar">
                                            <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar02.png" alt="" />
                                            </div>
                                            <div className="avatar-info">
                                                <h2 className="title">Robert Fox</h2>
                                                <span>CEO, Gerow Agency</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="testimonial-item-two">
                                    <div className="testimonial-content-two">
                                        <div className="rating">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <p>“ Morem ipsum dolor sit amet, consectetur adipiscing elita florai sum dolor sit amet, consecteture.Borem ipsum dolor sit amet, consectetur.</p>
                                        <div className="testimonial-avatar">
                                            <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div>
                                            <div className="avatar-info">
                                                <h2 className="title">Mr.Robey Alexa</h2>
                                                <span>CEO, Gerow Agency</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                        <div className="testimonial-nav-two">
                            <button type="button" className="slick-prev slick-arrow" onClick={previous}>
                                <i className="flaticon-right-arrow" />
                            </button>
                            <button type="button" className="slick-next slick-arrow" onClick={next}>
                                <i className="flaticon-right-arrow" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
