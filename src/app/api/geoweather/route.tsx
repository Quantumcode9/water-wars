import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // for geolocation
    let ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.ip;

    // for local development, use your own IP address
    if (!ip || ip === '::1' || ip.startsWith('127.0.0.1')) {
      ip = '172.16.0.1';  // <-- default. Change this to your own IP address
    } else if (ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }

    console.log('User IP:', ip);

    const geoResponse = await fetch(
      `https://api.weatherapi.com/v1/ip.json?key=${process.env.WEATHERAPI_KEY}&q=${ip}`
    );

    if (!geoResponse.ok) {
      const errorText = await geoResponse.text();
      console.error('Error fetching geolocation data:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch geolocation data' },
        { status: 500 }
      );
    }

    const geoData = await geoResponse.json();

    console.log('Geolocation Data:', geoData);

    const { lat, lon, city, region, country } = geoData;

    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${lat},${lon}`
    );

    if (!weatherResponse.ok) {
      const errorText = await weatherResponse.text();
      console.error('Error fetching weather data:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: 500 }
      );
    }

    const weatherData = await weatherResponse.json();
    console.log('Weather Data:', weatherData); // to check the data received

    const data = {
      location: {
        city,
        region,
        country,
        lat,
        lon,
      },
      weather: weatherData,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in weather API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}