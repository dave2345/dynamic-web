import { useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { ErrorToast, SuccessToast } from '../../../components/notification';


export default function HomeHero({ home }) {
    const { data, setData, post, progress } = useForm({
        title: home.title || '',
        subtitle: home.subtitle || '',
        hero_title: home.hero_title || '',
        hero_description: home.hero_description || '',
        hero_button_text: home.hero_button_text || '',
        hero_button_link: home.hero_button_link || '',
        hero_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/home/${home.id}`, {
            forceFormData: true,
            _method: 'put',
        });
    };

    return (
        <AdminLayout id="home" title={'Edit Home Page Hero'}>


            <div className="bg-black-50 container mx-auto py-20">
                <form
                    onSubmit={handleSubmit}
                    className="text-white-800 grid grid-cols-1 gap-10 rounded-xl bg-gradient-to-r from-blue-900 to-purple-500 p-8 shadow-xl hover:scale-102 hover:from-green-700 lg:grid-cols-2"
                >
                    {/* LEFT SIDE */}
                    <div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="font-semibold">Hero Title</label>
                            <input
                                type="text"
                                value={data.hero_title}
                                onChange={(e) =>
                                    setData('hero_title', e.target.value)
                                }
                                className="mt-1 w-full rounded-lg border bg-gray-200 p-3 text-black hover:scale-105"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Hero Description
                            </label>
                            <textarea
                                value={data.hero_description}
                                onChange={(e) =>
                                    setData('hero_description', e.target.value)
                                }
                                className="mt-1 w-full rounded-lg border bg-gray-200 p-3 text-black hover:scale-105"
                                rows={4}
                            ></textarea>
                        </div>

                        <div>
                            <label className="font-semibold">Button Text</label>
                            <input
                                type="text"
                                value={data.hero_button_text}
                                onChange={(e) =>
                                    setData('hero_button_text', e.target.value)
                                }
                                className="mt-1 w-full rounded-lg border bg-gray-200 p-3 text-black hover:scale-105"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Button Link</label>
                            <input
                                type="text"
                                value={data.hero_button_link}
                                onChange={(e) =>
                                    setData('hero_button_link', e.target.value)
                                }
                                className="mt-1 w-full rounded-lg border bg-gray-200 p-3 text-black hover:scale-105"
                            />
                        </div>

                        <button
                            type="submit"
                            className="b-gray-500 w-full rounded-lg bg-gray-400 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-green-300"
                        >
                            Save Changes
                        </button>
                    </div>

                    {/* RIGHT SIDE */}
                    <div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <label className="block font-semibold">
                            Hero Image
                        </label>

                        {home.hero_image && (
                            <img
                                src={`/storage/${home.hero_image}`}
                                alt="Current Hero"
                                className="mb-4 w-full rounded-xl shadow-lg"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData('hero_image', e.target.files[0])
                            }
                            className="w-full rounded-lg border bg-gray-50 p-3"
                        />

                        {progress && (
                            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className="bg-dt-blue h-2 rounded-full"
                                    style={{ width: `${progress.percentage}%` }}
                                />
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
