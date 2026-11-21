"""Hold the new APK until the event ends; ignore later annual cron ticks."""
import os
import time

EVENT_END = 1795294800  # 22 November 2026, 00:00 Moscow


def decide(event, now):
    build = event != 'schedule' or EVENT_END <= now < EVENT_END + 86400
    return {'build': build, 'publish': build and now >= EVENT_END}


if __name__ == '__main__':
    flags = decide(os.environ.get('GITHUB_EVENT_NAME', 'push'), int(time.time()))
    with open(os.environ['GITHUB_OUTPUT'], 'a', encoding='utf-8') as output:
        for key, value in flags.items():
            output.write(f'{key}={str(value).lower()}\n')
    print('Build:', flags['build'], '| Publish:', flags['publish'])
