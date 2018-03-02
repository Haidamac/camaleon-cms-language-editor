class Plugins::CamaLanguageEditor::AdminController < CamaleonCms::Apps::PluginsAdminController
  include Plugins::CamaLanguageEditor::MainHelper
  add_breadcrumb('Translations Editor')

  def index
    # actions for admin panel
  end

  def update
    locale_file_path = Rails.root.join("app/apps/themes/#{current_theme.slug}/config/locales/#{params[:lang]}.yml")
    unless File.exist? locale_file_path
      File.open locale_file_path, "w"
      current_yml = {}
    else
      current_yml = YAML.load_file locale_file_path
    end

    params_hash = params[:branch].reverse.inject { |memo, item| memo.empty? ? item : {item => memo } }
    result_yml = current_yml.deep_merge(params_hash)

    File.write(locale_file_path, result_yml.to_yaml)
    render :json => 'ok'
  end
end
