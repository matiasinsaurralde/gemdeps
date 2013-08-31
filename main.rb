#!/usr/bin/env ruby
# encoding: utf-8

require 'nokogiri'
require 'open-uri'
require 'oj'
require 'pp'

def get_dependencies( gem_name )

	# puts gem_name

	html, dependencies = Nokogiri::HTML( open( "http://rubygems.org/gems/#{gem_name}").read() ), []

	html.css('#runtime_dependencies').css('a').each do |a|
		dependency_name = a.inner_text.split(' ').first()
		dependencies.push( dependency_name )
	end

	dependencies
	
end

initial_gems = 'rails', 'activerecord', 'bundler', 'rack', 'sinatra', 'merb', 'rspec', 'twitter'

data = {}

initial_gems.each do |initial_gem|

	dependencies = get_dependencies( initial_gem )

	if !data[initial_gem]
		data.store( initial_gem, nil )
	end

	data[initial_gem] = dependencies

	dependencies.each do |gem|
		if !data[gem]
			data.store( gem, nil )
		end

		data[gem] = ( get_dependencies( gem ) )
	end

end

pp data

print Oj.dump( data )
