"use client"
import React, { useState } from 'react';
import Image from 'next/image';

type FormData = {
    name: string;
    email: string;
    message: string;
};

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen w-full flex flex-col p-3 space-y-3 md:space-y-0 md:space-x-3 md:flex-row rounded-xl">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 relative h-[25rem] sm:h-[30rem] md:h-screen rounded-xl">
                <Image
                    src="/gold.png"
                    alt="Contact Image"
                    fill
                    className="rounded-xl object-cover"
                />
            </div>

            {/* Right Side - Contact Form and Addresses */}
            <div className="w-full md:w-1/2 flex flex-col gap-3">
                {/* Contact Form Section */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex-1 bg-zinc-100 rounded-xl flex flex-col">
                    {/* Contact Header */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center sm:text-left">Liên hệ chúng tôi</h2>

                    {/* Form - pushed down using flex-grow */}
                    <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-end space-y-4 mt-4 md:mt-auto">

                        {/* Name & Email Fields */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Họ và tên"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="flex-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Địa chỉ email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="flex-1 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-3 border"
                            />
                        </div>

                        {/* Message Field */}
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            required
                            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-3 border"
                            placeholder="Lời nhắn của bạn"
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Gửi đi
                        </button>
                    </form>
                </div>

                {/* Address Section */}
                <div className="flex flex-col md:flex-row gap-3">
                    {/* Main Office */}
                    <div className="w-full md:w-1/2 p-4 sm:p-5 bg-zinc-100 rounded-xl">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                            CÔNG TY TNHH MỘT THÀNH VIÊN BẢO LY
                        </h3>
                        <address className="not-italic text-sm text-gray-600">
                            <p>Địa chỉ: 15 Chế Lan Viên, Phường Tân Thạnh,</p>
                            <p>Thành phố Tam Kỳ, Tỉnh Quảng Nam</p>
                            <p className="mt-2">VPDD: 32/5/10 Đường số 12, Phường 11,</p>
                            <p>Quận Gò Vấp, TP.Hồ Chí Minh</p>
                            <p className="mt-2">Email: maiphuccl@gmail.com</p>
                            <p>Hotline: 0903 924 405</p>
                        </address>
                    </div>

                    {/* Garden Information */}
                    <div className="w-full md:w-1/2 p-4 sm:p-5 bg-zinc-100 rounded-xl">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Vườn sâm</h3>
                        <address className="not-italic text-sm text-gray-600">
                            <p>Công ty CP Đầu Tư Phát Triển Dược Liệu Win-Win</p>
                            <p>Công ty TNHH KTC Quảng Nam</p>
                            <p>Công ty Cổ Phần Trồng Trọt - Chế Biến Dược Liệu Quảng Nam</p>
                            <p className="mt-2">Địa chỉ: Thôn 3, xã Trà Nam,</p>
                            <p>huyện Nam Trà My, tỉnh Quảng Nam</p>
                        </address>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;