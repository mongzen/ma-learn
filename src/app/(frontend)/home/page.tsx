import config from '@payload-config'
import { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

export const metadata: Metadata = {
  title: 'MaLearn - เรียนรู้ทักษะใหม่ออนไลน์',
  description: 'แพลตฟอร์มการเรียนรู้ออนไลน์ที่ให้คุณเรียนรู้ทักษะใหม่ๆ ด้วยคอร์สคุณภาพสูง',
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  // ดึงคอร์สแนะนำ
  const featuredCourses = await payload.find({
    collection: 'courses',
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          featured: {
            equals: true,
          },
        },
      ],
    },
    limit: 6,
    sort: '-createdAt',
  })

  // ดึงคอร์สทั้งหมด
  const recentCourses = await payload.find({
    collection: 'courses',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 8,
    sort: '-createdAt',
  })

  // ดึงหมวดหมู่
  const categories = await payload.find({
    collection: 'categories',
    limit: 6,
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              เรียนรู้ทักษะใหม่
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                ที่คุณต้องการ
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              พัฒนาตัวเองด้วยคอร์สออนไลน์คุณภาพสูงจากผู้เชี่ยวชาญ เรียนได้ทุกที่ทุกเวลา
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/courses"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                เริ่มเรียนเลย
              </Link>
              <Link
                href="/courses"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
              >
                ดูคอร์สทั้งหมด
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{recentCourses.totalDocs}+</div>
                <div className="text-blue-200">คอร์สออนไลน์</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{categories.totalDocs}+</div>
                <div className="text-blue-200">หมวดหมู่</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">∞</div>
                <div className="text-blue-200">ความรู้</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              หมวดหมู่ยอดนิยม
            </h2>
            <p className="text-xl text-gray-600">
              เลือกหมวดหมู่ที่คุณสนใจและเริ่มต้นการเรียนรู้
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.docs.map((category, index) => {
              const gradients = [
                'from-blue-400 to-blue-600',
                'from-purple-400 to-purple-600',
                'from-green-400 to-green-600',
                'from-orange-400 to-orange-600',
                'from-pink-400 to-pink-600',
                'from-indigo-400 to-indigo-600',
              ]
              const gradient = gradients[index % gradients.length]

              return (
                <Link
                  key={category.id}
                  href={`/courses?category=${category.slug}`}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${gradient} p-8 rounded-xl text-white hover:scale-105 transition-transform duration-300`}>
                    <div className="text-4xl mb-4">
                      {index === 0 && '💻'}
                      {index === 1 && '📊'}
                      {index === 2 && '🎨'}
                      {index === 3 && '📱'}
                      {index === 4 && '🔧'}
                      {index === 5 && '🚀'}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-white/80">เรียนรู้{category.title}จากผู้เชี่ยวชาญ</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      {featuredCourses.docs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                คอร์สแนะนำ
              </h2>
              <p className="text-xl text-gray-600">
                คอร์สยอดนิยมที่นักเรียนแนะนำ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.docs.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Course Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                      {course.thumbnail && typeof course.thumbnail === 'object' && (
                        <img
                          src={`/api/media/file/${course.thumbnail.filename}`}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">
                          ⭐ แนะนำ
                        </span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {course.category && typeof course.category === 'object' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {course.category.title}
                          </span>
                        )}
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                          {course.difficulty === 'beginner' && 'เริ่มต้น'}
                          {course.difficulty === 'intermediate' && 'กลาง'}
                          {course.difficulty === 'advanced' && 'ขั้นสูง'}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.shortDescription}
                      </p>

                      {/* Course Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <span>⏱️ {course.duration?.hours} ชั่วโมง</span>
                          <span>📚 {course.duration?.lessons} บท</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          ฿{course.price?.fiatPrice?.toLocaleString()}
                        </span>
                        <span className="text-blue-600 font-medium group-hover:text-blue-800">
                          ดูรายละเอียด →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/courses"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                ดูคอร์สทั้งหมด
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              คอร์สล่าสุด
            </h2>
            <p className="text-xl text-gray-600">
              คอร์สใหม่ล่าสุดที่เพิ่งเปิดตัว
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentCourses.docs.slice(0, 4).map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Course Image */}
                  <div className="relative h-40 bg-gradient-to-br from-gray-400 to-gray-600">
                    {course.thumbnail && typeof course.thumbnail === 'object' && (
                      <img
                        src={`/api/media/file/${course.thumbnail.filename}`}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {course.shortDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ฿{course.price?.fiatPrice?.toLocaleString()}
                      </span>
                      <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800">
                        เรียนเลย →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            พร้อมที่จะเริ่มต้นการเรียนรู้แล้วหรือยัง?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            เข้าร่วมกับนักเรียนหลายพันคนและเริ่มพัฒนาทักษะของคุณวันนี้
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            เริ่มเรียนฟรี
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
