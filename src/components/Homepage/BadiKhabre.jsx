import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory, getBreakingNews } from "@/lib/wordpress"; // ✅ getBreakingNews import kiya
import BreakingSlider from "./BreakingSlider"; // ✅ BreakingSlider import kiya

export default async function BadiKhabre() {

  const [coverStoryTop, coverStoryBig, newsLatest] = await Promise.all([
    getPostsByCategory("cover-story-top", 5),
    getPostsByCategory("cover-story-big", 3),
    getPostsByCategory("news-latest", 5),
  ]);

  // ✅ Breaking News fetch karo slider ke liye
  const breakingNews = await getBreakingNews(8);

  return (
    <section className="container max-w-7xl mx-auto py-5 px-4">
        <div className="flex items-center gap-2 mb-4">
            <span className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[10px] border-t-transparent border-b-transparent border-l-red-600"></span>
            <h2 className="text-lg font-bold text-black">ट्रेंडिंग न्यूज़</h2>
          </div>
      <div className="grid grid-cols-12 gap-5">
        
        {/* ========================================================= */}
        {/* LEFT - बड़ी खबरें (Text Only with Borders) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-3">
          <div className="rounded-sm border border-gray-200 overflow-hidden bg-white shadow-sm">
            <div className="divide-y px-3 py-2 divide-gray-100">
              {newsLatest.slice(0, 4).map((post, idx) => (
                <Link key={post.id} href={`/post/${post.slug}`}>
                  <article className="group flex gap-2.5 px-2 py-2 hover:bg-red-50 transition-colors">
                    <span className="text-red-600 font-bold text-sm min-w-[24px]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold leading-snug text-gray-800 group-hover:text-red-600 line-clamp-3">
                        {post.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-100 px-3 py-2 bg-gray-50 text-center">
              <Link href="/latest" className="text-[10px] text-red-600 hover:underline font-semibold inline-flex items-center gap-1">
                सभी देखें <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NAYA: BREAKING SLIDER (Middle & Right ki jagah) */}
        {/* ========================================================= */}
            <div className="col-span-12 lg:col-span-9">
          <BreakingSlider breakingNews={breakingNews} />
        </div>

        {/* ========================================================= */}
        {/* CENTER - Image News (COMMENTED) */}
        {/* ========================================================= */}
        {/* 
        <div className="col-span-12 lg:col-span-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {coverStoryBig.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`}>
                <article className="group cursor-pointer bg-[#F5F5F5] border border-[#d1d1d1] h-auto lg:h-80">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-fill"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2 sm:mt-3 text-[15px] sm:text-[15px] p-2 font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-4 sm:line-clamp-6">
                    {post.title}
                  </h3>
                </article>
              </Link>
            ))}
          </div>
        </div>
        */}

        {/* ========================================================= */}
        {/* RIGHT - न्यूज़ इंडिया 24x7 (COMMENTED) */}
        {/* ========================================================= */}
        {/* 
        <div className="col-span-12 lg:col-span-4 mt-4 lg:mt-0">
          <div className="border-t-4 border-b-4 border-l-[10px] border-r-[10px] border-red-600 p-4 bg-white rounded-sm">
            <h2 className="text-lg font-bold mb-4">
              <span className="text-red-600">न्यूज़ इंडिया 24x7</span>{" "}
              <span className="text-gray-900">विशेष</span>
            </h2>

            <div className="space-y-4">
              {newsLatest.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`}>
                  <div className="flex gap-4 items-start group cursor-pointer p-1 py-2">
                    <div className="relative w-24 sm:w-30 h-16 shrink-0 overflow-hidden bg-gray-100">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-[8px]">No Image</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-sm font-bold leading-5 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-2 pt-3">
              <Link
                href="/latest"
                className="text-red-600 font-bold text-sm hover:text-red-700 transition-colors inline-flex items-center gap-1"
              >
                और भी <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
        </div>
        */}

      </div>
    </section>
  );
}