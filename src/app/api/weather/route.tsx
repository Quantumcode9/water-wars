import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'Missing city parameter' },
      { status: 400 }
    );
  }

  const apiKey = process.env.WEATHERAPI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing API key' },
      { status: 500 }
    );
  }

  try {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
      city
    )}&aqi=no`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from WeatherAPI:', errorText);
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    console.log('WeatherAPI data:', data); // to check the data received

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}