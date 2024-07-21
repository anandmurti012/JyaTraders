'use client'
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
                                <h2 className="title tg-element-title">What Customers Say’s About Jya Trades Services</h2>
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
                                        <p>“JYA Trades training programs transformed my understanding of the market. The comprehensive courses and expert guidance helped me become a confident and successful trader.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Ravi Sharma, Kolkata</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ I opened my trading account with Kotak Securities through JYA Trades, and the zero fee account opening was a fantastic benefit. The support and resources provided have been exceptional.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar02.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Priya Kapoor, Mumbai</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ The wealth management services at JYA Trades have given me peace of mind about my financial future. Their retirement planning and consultancy services are top-notch.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Amit Patel, Ahmedabad</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ Dr. Moni’s Prakash Dental Clinic offers excellent dental care. The experienced professionals and state-of-the-art facilities make every visit comfortable and reassuring.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Sneha Reddy, Bengaluru</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ With Tata AIA Insurance, I feel secure knowing that my family is protected. The term insurance plan was easy to understand and perfectly suited to my needs.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Vikram Singh, Delhi</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ The commodity trading platform at JYA Trades is user-friendly and efficient. I’ve been able to diversify my investments and see substantial returns.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Anjali Desai, Chennai</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ JYA Trades zero loss psychology training has been a game-changer for me. It’s helped me approach trading with a more disciplined and confident mindset.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Rajesh Nair, Kochi</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ The customer service and support from JYA Trades are outstanding. Their personalized consultancy has greatly assisted me in managing and growing my wealth.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Nisha Gupta, Jaipur</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ I’ve been trading forex with JYA Trades and the experience has been seamless. Their training and tools have provided me with the skills and confidence to succeed in the forex market.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Manoj Kumar, Pune</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ I’ve been trading forex with JYA Trades and the experience has been seamless. Their training and tools have provided me with the skills and confidence to succeed in the forex market.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Manoj Kumar, Pune</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
                                        <p>“ Thanks to JYA Trades swing trading strategies, I’ve been able to capitalize on market movements effectively. The training and resources provided are invaluable.</p>
                                        <div className="testimonial-avatar">
                                            {/* <div className="avatar-thumb">
                                                <img src="/assets/img/images/testi_avatar01.png" alt="" />
                                            </div> */}
                                            <div className="avatar-info">
                                                <h2 className="title">Arjun Mehta, Hyderabad</h2>
                                                {/* <span>CEO, Gerow Agency</span> */}
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
