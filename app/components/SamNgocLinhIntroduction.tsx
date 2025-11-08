"use client"
import React from 'react';

import { Tag, MapPin, Mountain, Leaf, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useScrollAnimation } from './utils/useScrollAnimation';
import HeaderSection from './Header';

const SamNgocLinhIntroduction = () => {
    const contentBlocks = [
        {
            type: "text",
            content: "Sâm Ngọc Linh là một loại thảo dược quý hiếm, được xem là 'quốc bảo' của Việt Nam. Loài sâm này chỉ mọc tự nhiên ở vùng núi Ngọc Linh, thuộc tỉnh Quảng Nam, nơi có độ cao từ 1.200 đến 2.000 mét so với mực nước biển. Nhờ điều kiện khí hậu và thổ nhưỡng đặc biệt, Sâm Ngọc Linh chứa nhiều hoạt chất sinh học quý giá, mang lại lợi ích sức khỏe vượt trội."
        },
        {
            type: "image",
            content: "/lasam/7.jpg",
            metadata: {
                alt: "Dãy núi Ngọc Linh",
                description: "Khung cảnh thiên nhiên hoang sơ, nơi Sâm Ngọc Linh phát triển tự nhiên"
            }
        },
        {
            type: "text",
            content: "Sâm Ngọc Linh được phát hiện vào những năm 1970 và từ đó đã được nghiên cứu rộng rãi. Các nghiên cứu khoa học cho thấy loại sâm này có chứa hơn 50 hợp chất Saponin khác nhau, nhiều hơn hẳn so với các loại sâm khác trên thế giới. Điều này làm nên giá trị đặc biệt của Sâm Ngọc Linh trong y học và chăm sóc sức khỏe."
        },
        {
            type: "text",
            content: "Sâm ngọc linh cung cấp rất nhiều nguyên tố vi lượng, dưỡng chất và khoáng chất cần thiết cho cơ thể. Do đó, việc sử dụng sâm ngọc linh sẽ giúp cho hệ tiêu hóa của bạn được điều hòa và giúp bạn ăn ngon, ngủ ngon hơn. Ngoài ra, sâm ngọc linh còn giúp tăng cường sức đề kháng, nâng cao hệ miễn dịch để chống lại những vi khuẩn gây bệnh cho cơ thể."
        },
        {
            type: "text",
            content: "Hoạt chất Majonoside - R2 có trong sâm ngọc linh mang lại khả năng phục hồi sự rối loạn chức năng do căng thẳng, áp lực kéo dài. Nhờ vậy mà sẽ giúp người bệnh giảm thiểu lo âu, chống lại căng thẳng, mệt mỏi và hội chứng trầm cảm. Bên cạnh đó, sâm ngọc linh còn hỗ trợ cải thiện tình trạng suy nhược hệ thần kinh, tăng cường trí nhớ và điều hòa hoạt động ở não bộ."
        },
        {
            type: "image",
            content: "/hatsam/3.jpg",
            metadata: {
                alt: "Củ sâm Ngọc Linh",
                description: "Hình ảnh củ Sâm Ngọc Linh tự nhiên với hình dáng đặc trưng"
            }
        },
        {
            type: "text",
            content: "Những công dụng nổi bật của Sâm Ngọc Linh bao gồm tăng cường sức đề kháng, hỗ trợ điều trị suy nhược cơ thể, giảm căng thẳng, chống lão hóa, và đặc biệt có tác dụng hỗ trợ điều trị một số bệnh mãn tính như tiểu đường, huyết áp cao."
        },
        {
            type: "image",
            content: "/hoasam/5.jpg",
            metadata: {
                alt: "Hoa Sâm Ngọc Linh",
                description: "Hình ảnh hoa Sâm Ngọc Linh, loài hoa hiếm gặp chỉ nở vào một số thời điểm trong năm"
            }
        },
        {
            type: "text",
            content: "Hiện nay, việc trồng và bảo tồn Sâm Ngọc Linh đang được kiểm soát chặt chẽ để đảm bảo chất lượng và bảo vệ nguồn gen quý giá. Cùng với đó, các sản phẩm chế biến từ Sâm Ngọc Linh như rượu sâm, trà sâm, viên nang chiết xuất đang ngày càng phổ biến trên thị trường."
        },
        {
            type: "text",
            content: "Trà sâm ngọc linh: Bạn có thể pha trà từ sâm khô hay sâm tươi đều được. Với vị thơm mát dễ chịu, trà sâm có thể được dùng để sử dụng hằng ngày. Do đây là dạng nước trà nên bạn hoàn toàn dùng được ở bất cứ thời điểm nào trong ngày. Tuy nhiên, bạn nên hạn chế uống trà vào buổi tối bởi trà có thể gây cảm giác bồn chồn và khó ngủ."
        },
        {
            type: "text",
            content: "Sâm ngâm mật ong: Vào mỗi buổi sáng sớm khi bụng đang còn đói, bạn nên uống sâm ngọc linh ngâm mật ong bởi nó sẽ cho hiệu quả tốt nhất. Đây chính là lúc mà dạ dày đang còn trống, không còn chứa thức ăn nên sẽ giúp cho ruột được dễ dàng hấp thụ dưỡng chất và giúp cho quá trình chuyển hóa tốt hơn. Bạn nên dùng với liều lượng từ 10 đến 20ml sâm ngâm mật ong, tương đương với 1 thìa nhỏ."
        },
        {
            type: "image",
            content: "/cusam/2.jpg",
            metadata: {
                alt: "Rễ sâm Ngọc Linh",
                description: "Cận cảnh rễ Sâm Ngọc Linh được thu hoạch và làm sạch trước khi chế biến"
            }
        }
    ];

    const keyFeatures = [
        {
            icon: Mountain,
            title: "Nguồn gốc địa lý độc đáo",
            description: "Chỉ mọc tự nhiên tại dãy núi Ngọc Linh ở độ cao từ 1.200 - 2.000 mét"
        },
        {
            icon: Leaf,
            title: "Dược tính quý hiếm",
            description: "Chứa hơn 50 loại Saponin đặc biệt mà không có ở các loại sâm khác"
        },
        {
            icon: MapPin,
            title: "Canh tác hạn chế",
            description: "Quy trình nuôi trồng và thu hoạch được kiểm soát nghiêm ngặt để bảo vệ chất lượng và hệ sinh thái"
        }
    ];

    return (
        <>
            <HeaderSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                        {/* Page Header */}
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-block text-xs text-green-700 font-light bg-green-50 border border-green-200 px-2 py-1 rounded">
                                    Thảo dược quý
                                </span>
                                <span className="inline-block text-xs text-green-700 font-light bg-green-50 border border-green-200 px-2 py-1 rounded">
                                    Di sản Việt Nam
                                </span>
                            </div>

                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
                                Sâm Ngọc Linh: Báu vật sâm núi của Việt Nam
                            </h1>

                            <div className="h-px bg-gray-200"></div>
                        </div>
                        {/* Article Content */}
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                            {contentBlocks.map((block, index) => {
                                switch (block.type) {
                                    case "text":
                                        return (
                                            <div
                                                key={index}
                                                className="text-base sm:text-lg"
                                            >
                                                {block.content}
                                            </div>
                                        );
                                    case "image":
                                        return (
                                            <figure key={index} className="my-4 sm:my-6 lg:my-8">
                                                <img
                                                    src={block.content}
                                                    alt={block.metadata?.alt || ""}
                                                    className="w-full rounded-lg"
                                                />
                                                {block.metadata?.description && (
                                                    <figcaption className="text-center text-xs sm:text-sm text-gray-500 mt-2">
                                                        {block.metadata.description}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>

                        {/* Đặc điểm chính */}
                        <div className="overflow-hidden">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <h3 className="font-bold text-sm sm:text-base">Đặc điểm nổi bật</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {keyFeatures.map((feature, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                <feature.icon className="w-5 h-5 mr-2 text-green-600" />
                                                <h4 className="font-semibold text-sm">{feature.title}</h4>
                                            </div>
                                            <p className="text-xs text-gray-600">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Thẻ liên quan */}
                        <div className="overflow-hidden">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <h3 className="font-bold text-sm sm:text-base">Thẻ liên quan</h3>
                                </div>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {["Thảo dược", "Việt Nam", "Nhân sâm", "Y học cổ truyền", "Núi Ngọc Linh"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-block text-xs sm:text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:sticky lg:top-48 lg:self-start space-y-4 sm:space-y-6">
                        <nav className="text-sm">
                            <ul className="flex items-center h-8 space-x-2">
                                <div className="w-1 h-5 bg-green-600"></div>
                                <li className="flex items-center text-black text-sm sm:text-base font-light">
                                    <span>Thông tin liên quan</span>
                                </li>
                            </ul>
                        </nav>

                        <ul className="space-y-4">
                            {[
                                {
                                    title: "Canh tác Sâm Ngọc Linh",
                                    imgUrl: "/lasam/7.jpg",
                                    imgAlt: "Canh tác Sâm Ngọc Linh",
                                    description: "Tìm hiểu về các kỹ thuật trồng trọt chuyên biệt cho loại sâm quý hiếm này."
                                },
                                {
                                    title: "Lợi ích dược liệu",
                                    imgUrl: "/lasam/7.jpg",
                                    imgAlt: "Lợi ích dược liệu",
                                    description: "Khám phá các công dụng độc đáo của Sâm Ngọc Linh đối với sức khỏe."
                                }
                            ].map((item, index) => (
                                <li key={item.title}>
                                    <Link href="#">
                                        <div className="flex gap-3">
                                            <div className="w-28 sm:w-36 h-24 sm:h-28 flex-shrink-0">
                                                <img
                                                    src={item.imgUrl}
                                                    alt={item.imgAlt}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs sm:text-sm font-semibold line-clamp-2 sm:line-clamp-3 mt-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    {index < 1 && (
                                        <div className="h-px bg-gray-200 my-4" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SamNgocLinhIntroduction;