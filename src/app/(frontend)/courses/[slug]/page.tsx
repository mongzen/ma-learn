import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

interface CoursePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const payload = await getPayload({ config })
  
  const courses = await payload.find({
    collection: 'courses',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  const course = courses.docs[0]

  if (!course) {
    return {
      title: 'ไม่พบคอร์ส | MaLearn'
    }
  }

  return {
    title: `${course.title} | MaLearn`,
    description: course.shortDescription,
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const payload = await getPayload({ config })
  
  const courses = await payload.find({
    collection: 'courses',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  const course = courses.docs[0]

  if (!course) {
    notFound()
  }

  // ดึงข้อมูลผู้สอน
  const instructor = typeof course.instructor === 'object' ? course.instructor : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-gray-500">
                  คอร์ส
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-600 font-medium">{course.title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                {course.category && typeof course.category === 'object' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {course.category.title}
                  </span>
                )}
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  {course.difficulty === 'beginner' && 'เริ่มต้น'}
                  {course.difficulty === 'intermediate' && 'กลาง'}
                  {course.difficulty === 'advanced' && 'ขั้นสูง'}
                </span>
                {course.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    ⭐ แนะนำ
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6">
                {course.shortDescription}
              </p>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">⏱️</div>
                  <div className="text-sm text-gray-500">ระยะเวลา</div>
                  <div className="font-semibold">{course.duration?.hours} ชั่วโมง</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">📚</div>
                  <div className="text-sm text-gray-500">บทเรียน</div>
                  <div className="font-semibold">{course.duration?.lessons} บท</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">🌍</div>
                  <div className="text-sm text-gray-500">ภาษา</div>
                  <div className="font-semibold">
                    {course.language === 'en' ? 'English' : 'ไทย'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">🎯</div>
                  <div className="text-sm text-gray-500">ระดับ</div>
                  <div className="font-semibold">
                    {course.difficulty === 'beginner' && 'เริ่มต้น'}
                    {course.difficulty === 'intermediate' && 'กลาง'}
                    {course.difficulty === 'advanced' && 'ขั้นสูง'}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">เกี่ยวกับคอร์สนี้</h2>
              <div className="prose max-w-none text-gray-600">
                {/* Rich text content would be rendered here */}
                <p>คอร์สนี้จะสอนให้คุณเรียนรู้และเข้าใจเนื้อหาต่างๆ อย่างลึกซึ้ง ด้วยการสอนแบบ hands-on และตัวอย่างจริง</p>
              </div>
            </div>

            {/* What You'll Learn */}
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">สิ่งที่คุณจะได้เรียนรู้</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item.outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">ข้อกำหนดเบื้องต้น</h2>
                <ul className="space-y-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{req.requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Curriculum */}
            {course.curriculum && course.curriculum.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">หลักสูตร</h2>
                <div className="space-y-4">
                  {course.curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border border-gray-200 rounded-lg">
                      <div className="bg-gray-50 px-6 py-4 rounded-t-lg">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {section.sectionTitle}
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3">
                          {section.lessons?.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  {lesson.type === 'video' ? '🎥' : '📄'}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{lesson.title}</div>
                                  <div className="text-sm text-gray-500">{lesson.duration} นาที</div>
                                </div>
                              </div>
                              {lesson.isFree && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                                  ฟรี
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Course Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-6">
                  {course.thumbnail && typeof course.thumbnail === 'object' && (
                    <img
                      src={`/api/media/file/${course.thumbnail.filename}`}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ฿{course.price?.fiatPrice?.toLocaleString()}
                  </div>
                  {course.price?.cryptoPrice && course.price.cryptoPrice.length > 0 && (
                    <div className="text-sm text-gray-500">
                      หรือ {course.price.cryptoPrice[0].price} {course.price.cryptoPrice[0].currency.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                  ลงทะเบียนเรียน
                </button>

                <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors mb-6">
                  เพิ่มในรายการโปรด
                </button>

                {/* Course Features */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">เรียนได้ตลอดชีวิต</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">ใบประกาศนียบัตร</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">การสนับสนุน 24/7</span>
                  </div>
                </div>
              </div>

              {/* Instructor Card */}
              {instructor && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">ผู้สอน</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-600">
                        {instructor.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{instructor.name}</div>
                      <div className="text-sm text-gray-500">ผู้เชี่ยวชาญ</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
