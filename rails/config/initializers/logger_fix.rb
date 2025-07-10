# Fix for Ruby 3.3.4 Logger compatibility issue with Rails 7.0.4
# This ensures Logger is properly loaded before ActiveSupport tries to use it

require 'logger'

# Ensure Logger::Severity is available
unless defined?(Logger::Severity)
  Logger::Severity = Logger::Severity
end

# Monkey patch to ensure compatibility
module ActiveSupport
  module LoggerThreadSafeLevel
    unless defined?(Logger)
      Logger = ::Logger
    end
  end
end 