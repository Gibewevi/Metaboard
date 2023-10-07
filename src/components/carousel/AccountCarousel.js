import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SharedAccount from "@/components/sharedAccount/SharedAccount";

export default function AccountCarousel({ accounts, userId, url }) {

    const settings = {
        dots: true,
        infinite: false,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
        ]
    };

    return (
        <Slider {...settings}>
            {accounts.map((account, key) => (
                <div className="article-slide p-1" key={key}>
                    <SharedAccount account={account} user_id={userId} link={`${url}${account.account_id}`} />
                </div>
            ))}
        </Slider>
    );
};
